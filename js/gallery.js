import {renderThumbnails} from './thumbnails.js';
import {publicationsData} from './data.js';

const PUBLICATIONS_COUNT = 25;

const thumbnailsData = publicationsData(PUBLICATIONS_COUNT);
renderThumbnails(thumbnailsData);

export {thumbnailsData};
