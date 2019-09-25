import { isBefore, format, startOfHour, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';
import File from '../models/File';
import Notification from '../schemas/Notification';

import Queue from '../../lib/Queue';
import SubscriptionMail from '../jobs/SubscriptionMail';

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

    await Queue.add(SubscriptionMail.key, {
      meetup,
      user,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const subscription = await Subscription.findByPk(req.params.id, {
      where: { user_id: req.userId },
      include: [
        {
          model: Meetup,
          attributes: ['date'],
        },
      ],
    });

    if (!subscription) {
      return res.status(400).json({ error: 'Subscription does not exist!' });
    }

    if (subscription.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: "You don't have permission to cancel this meetup" });
    }

    if (isBefore(subscription.Meetup.date, new Date())) {
      return res
        .status(401)
        .json({ error: "You don't have permission to cancel past meetup" });
    }
    await subscription.destroy();

    return res.json(subscription);
  }
}

export default new SubscriptionController();
