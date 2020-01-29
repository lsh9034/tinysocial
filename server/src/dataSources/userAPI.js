/* eslint-disable require-jsdoc */
const {DataSource} = require('apollo-datasource');

const userIdIsNotPassedMessage = 'You have to pass userId';

class UserAPI extends DataSource {
  constructor(store) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getAttributeOfUser(attributeName, userId) {
    if (userId === undefined) {
      throw new Error(userIdIsNotPassedMessage);
    }
    if (attributeName === 'registrationDate') {
      attributeName = 'createdAt';
    }
    const user = await this.store.User.findOne({
      where: {
        id: userId,
      },
      attributes: [attributeName],
      raw: true,
    });
    return (user && user[attributeName]) ? user[attributeName] : null;
  }

  async getAgeOfUser(userId) {
    // TODO(yun-kwak): Test this.
    const today = new Date();
    const birthDate = await this.getAttributeOfUser('birthday',
        userId);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  async getHostedEventIdsOfUser({userId}) {
    if (userId === undefined) {
      throw new Error(userIdIsNotPassedMessage);
    }
    return this.store.Event.findAll({
      where: {
        host: userId,
      },
      attributes: ['id'],
      raw: true,
    });
  }

  async getParticipatedEventIdsOfUser({userId}) {
    if (userId === undefined) {
      throw new Error(userIdIsNotPassedMessage);
    }
    return this.store.EventParticipant.findAll({
      where: {
        userId,
      },
      attributes: [['eventId', 'id']],
      raw: true,
    });
  }

  // TODO(seongjae): Rename this function
  async getIdOfUser(userId) {
    return this.store.User.findOne({
      where: {id: userId},
      attributes: ['id'],
      raw: true,
    });
  }
}

module.exports = {
  UserAPI,
  userIdIsNotPassedMessage,
};
