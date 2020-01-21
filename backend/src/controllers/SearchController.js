const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {

  // Buscar por todos os devs num raio de 10km
  // Filtrar por tecnologias
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;
    
    const techsArray = parseStringAsArray(techs);
    
    const devs = await Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000 // 10km
        }
      }
    });
    
    return response.json(devs)
  },

  // update (não atualizar github_username)
  // destroy
}