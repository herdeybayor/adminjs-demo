import { AdminJSOptions } from 'adminjs';
import { connect } from 'mongoose';

import { Amenity } from '../mongoose/amenity.model.js';
import { BedType } from '../mongoose/bed-type.model.js';
import { Booking } from '../mongoose/booking.model.js';
import { Config } from '../mongoose/config.model.js';
import { Photo } from '../mongoose/photo.model.js';
import { Property } from '../mongoose/property.model.js';
import { Review } from '../mongoose/review.model.js';
import { Token } from '../mongoose/token.model.js';
import { User } from '../mongoose/user.model.js';

import componentLoader from './component-loader.js';

const mongooseDb = await connect('mongodb://localhost:27017/keenzchillz');

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/admin',
  resources: [Amenity, BedType, Booking, Config, Photo, Property, Review, Token, User],
  databases: [mongooseDb],
};

export default options;
