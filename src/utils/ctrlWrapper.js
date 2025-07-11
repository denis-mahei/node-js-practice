import req from 'express/lib/request.js';
import res from 'express/lib/response.js';

export const ctrlWrapper = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (e) {
      next(e);
    }
  };
};
