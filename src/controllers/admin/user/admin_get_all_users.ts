import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { AdminServiceImpl } from "../../../services";
import { ResponseSuccess } from "../../../types";
import { User } from "../../../models";

const adminGetAllUsers = async (req: Request, res: Response) => {
  try {
    const query = req.query;

    let limit = parseInt(query.limit as string);

    if (isNaN(limit) || limit <= 0) {
      limit = 10;
    }

    let offset = parseInt(query.offset as string);

    if (isNaN(offset) || offset < 0) {
      offset = 0;
    }
    const serviceResponse = await AdminServiceImpl.getAllUsers(limit, offset);

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const users = serviceResponse as ResponseSuccess<User[]>;

    res.status(users.statusCode).send(users);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while fetching users.",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminGetAllUsers;
