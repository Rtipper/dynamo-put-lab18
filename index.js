'use strict';

const friendsModel = require('./schema.js');


exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body)
    const id = event.queryStringParameters.id

    if (body.name && body.phone) {
      await friendsModel.update({ "id": id }, {"name": body.name}, {"phone": body.phone})
      
    } else if (body.name) {
      await friendsModel.update({ "id": id }, {"name": body.name})
    } else if (body.phone)
      await friendsModel.update({ "id": id }, {"phone": body.phone})

    const strigifiedId = JSON.stringify(id)
    return {
      statusCode: 201,
      body: `ID: ${strigifiedId} updated!`
    }

  } catch (e) {
    return {
      statusCode: 500,
      body: e.message
    }
  }
}