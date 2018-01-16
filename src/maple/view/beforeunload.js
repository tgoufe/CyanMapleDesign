'use strict';

import {listener}   from '../listener.js';

/**
 * @memberOf    maple.view
 * @type        {Listener}
 * */
let beforeunload = listener('before')
	;

export default beforeunload;