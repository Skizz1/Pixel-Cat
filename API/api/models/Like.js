/**
 * Like.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 module.exports = {

    attributes: {
        id_like: {
            type: 'string'
        },
        id_user: {
        	type: 'string'
        },
        pseudo: {
        	type: 'string'
        },
        image: {
        	type: 'longtext'
        },
        sexe: {
            type: 'string'
        }
    }
};

