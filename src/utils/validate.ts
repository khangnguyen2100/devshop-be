import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from 'src/helpers/core/error.response';
import { asyncHandler } from 'src/middleware/errorHandler';
import * as Yup from 'yup';

const validate = (schema: Yup.Schema) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err: any) {
      throw new BadRequestError(err.message);
    }
  });
const isObjectId = Yup.string().matches(/^[0-9a-fA-F]{24}$/, 'Invalid ID');
const paginationSchema = Yup.object().shape({
  page: Yup.number().min(0).required(),
  limit: Yup.number().min(1).required(),
  sort: Yup.string().optional(),
  select: Yup.array().of(Yup.string()).optional(),
  unSelect: Yup.array().of(Yup.string()).optional(),
});
const yupObject = (object: any) => Yup.object().shape(object);
const yupArray = (array: any) => Yup.array().of(array);

export { validate, isObjectId, paginationSchema, yupObject, yupArray };
