import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';

import Meetup from '../models/Meetup';
import File from '../models/File';

class MeetupController {
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
      user_id: req.userId,
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
      where: { user_id: req.userId, id: meetupId },
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
}

export default new MeetupController();
