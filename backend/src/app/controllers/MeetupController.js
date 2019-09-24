import * as Yup from 'yup';
import {
  startOfHour,
  parseISO,
  isBefore,
  startOfDay,
  endOfDay,
} from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import File from '../models/File';

class MeetupController {
  async index(req, res) {
    const { date, page = 1 } = req.query;
    const parsedDate = parseISO(date);
    const meetups = await Meetup.findAll({
      where: {
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
      attributes: ['id', 'title', 'description', 'location', 'date', 'banner'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: File,
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations Fails' });
    }

    /**
     * Check past dates
     */

    const { title, description, location, date } = req.body;
    const { originalname: name, filename: path } = req.file;

    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const file = await File.create({
      name,
      path,
    });

    const { id: banner_id } = file;

    const meetup = await Meetup.create({
      title,
      description,
      location,
      date,
      provider_id: req.userId,
      banner: banner_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      file: Yup.object().shape({
        name: Yup.string(),
      }),
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (
      !((await schema.isValid(req.body)) && !(await schema.isValid(req.file)))
    ) {
      return res.status(400).json({ error: 'Validations Fails' });
    }

    const meetupId = req.params.meetupId;

    const checkUserMeetup = await Meetup.findOne({
      where: { provider_id: req.userId, id: meetupId },
    });

    if (!checkUserMeetup) {
      return res
        .status(401)
        .json({ error: 'User can only update yours meetups' });
    }

    const { date: meetupDate } = checkUserMeetup;
    if (isBefore(meetupDate, new Date())) {
      return res
        .status(400)
        .json({ error: 'Update past dates are not permitted' });
    }

    const { date } = req.body;
    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const { banner } = checkUserMeetup;
    const file = await File.findByPk(banner);

    const { originalname: name, filename: path } = req.file;

    await file.update({
      name,
      path,
    });

    const meetup = await checkUserMeetup.update(req.body);

    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findByPk(req.params.meetupId);

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not exists' });
    }

    /**
     * Check meetup belong to user
     */
    if (meetup.provider_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permission to cancel this meetup" });
    }

    /**
     * Check past date meetup
     */

    if (isBefore(meetup.date, new Date())) {
      return res
        .status(401)
        .json({ error: 'You can only cancel meetups that did not happen' });
    }

    await meetup.destroy();

    return res.json(meetup);
  }
}

export default new MeetupController();
