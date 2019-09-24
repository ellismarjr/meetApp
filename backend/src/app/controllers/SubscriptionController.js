import { isBefore, format, startOfHour, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

import Mail from '../../lib/Mail';

class SubscriptionController {
  async index(req, res) {
    const subscription = await Subscription.findAll({
      where: { user_id: req.userId },

      include: [
        {
          model: Meetup,
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          attributes: [
            'id',
            'title',
            'description',
            'location',
            'date',
            'banner',
          ],
          order: [['date', 'DESC']],
          include: [
            {
              model: File,
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(subscription);
  }

  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.meetupId, {
      include: [User],
    });

    /**
     * Check if meetup exist
     */
    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not exist' });
    }

    /**
     * Check if user is trying to register on your meetup
     */
    if (meetup.provider_id === req.userId) {
      return res.json({ error: 'User cannot subscribe on their own meetup' });
    }

    /**
     * Check if the meetup has passed
     */
    if (isBefore(meetup.date, new Date())) {
      return res
        .status(401)
        .json({ error: 'User can not register on past date meetup' });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Meetup,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    /**
     * Notify meetup provider
     */
    const formattedDate = format(meetup.date, "dd 'de' MMMM', às' H:mm'h'", {
      locale: pt,
    });

    await Notification.create({
      content: `Novo inscrição do ${user.name} no meetup ${meetup.title} do dia ${formattedDate}`,
      user: meetup.provider_id,
    });

    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: 'Inscrição Confirmada!',
      template: 'registration',
      context: {
        name: meetup.User.name,
        user: user.name,
        title: meetup.title,
        description: meetup.description,
        location: meetup.location,
        date: format(meetup.date, "'dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
      },
    });

    return res.json(subscription);
  }
}

export default new SubscriptionController();
