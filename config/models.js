/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#!/documentation/concepts/ORM
 */

module.exports.models = {

  /***************************************************************************
  *                                                                          *
  * Your app's default connection. i.e. the name of one of your app's        *
  * connections (see `config/connections.js`)                                *
  *                                                                          *
  ***************************************************************************/
  //datastore: 'localDB',

  /***************************************************************************
  *                                                                          *
  * How and whether Sails will attempt to automatically rebuild the          *
  * tables/collections/etc. in your schema.                                  *
  *                                                                          *
  * See http://sailsjs.org/#!/documentation/concepts/ORM/model-settings.html  *
  *                                                                          *
  ***************************************************************************/
  migrate: 'alter',

  // These attributes will be added to all of your models.  When you create a new Sails 1.0
  // app with "sails new", a similar configuration will be generated for you.
  attributes: {
    // In Sails 1.0, the `autoCreatedAt` and `autoUpdatedAt` model settings
    // have been removed.  Instead, you choose which attributes (if any) to use as
    // timestamps.  By default, "sails new" will generate these two attributes as numbers,
    // giving you the most flexibility.  But for compatibility with your existing project,
    // we'll define them as strings.
    createdAt: { type: 'string', autoCreatedAt: true, },
    updatedAt: { type: 'string', autoUpdatedAt: true, }
  },

  /******************************************************************************
   *                                                                             *
   * The set of DEKs (data encryption keys) for at-rest encryption.              *
   * i.e. when encrypting/decrypting data for attributes with `encrypt: true`.   *
   *                                                                             *
   * > The `default` DEK is used for all new encryptions, but multiple DEKs      *
   * > can be configured to allow for key rotation.  In production, be sure to   *
   * > manage these keys like you would any other sensitive credential.          *
   *                                                                             *
   * > For more info, see:                                                       *
   * > https://sailsjs.com/docs/concepts/orm/model-settings#?dataEncryptionKeys  *
   *                                                                             *
   ******************************************************************************/
  dataEncryptionKeys: {
    default: 'Jxuica+dQeHT02DfJ6BFAxaK4TEcVzVOLREIHoBkGnU='
  },

};
