import { Request, Response } from "express";
import { responseUtils } from "../../../utils";
import { MusicServiceImpl } from "../../../services";
import { ResponseSuccess } from "../../../types";
import { Music } from "../../../models";

const adminGetMusicTerm = async (req: Request, res: Response) => {
  try {
    const query = req.query.term as string;

    const limit = parseInt(req.query.limit as string);

    if (isNaN(limit) || limit <= 0) {
      const err = responseUtils.createErrorResponse(
        "Limit must be a positive number",
        400
      );

      res.status(err.errorCode).send(err);

      return;
    }

    const offset = parseInt(req.query.offset as string);

    if (isNaN(offset) || offset < 0) {
      const err = responseUtils.createErrorResponse(
        "Offset must be a non-negative number",
        400
      );

      res.status(err.errorCode).send(err);

      return;
    }
    const serviceResponse = await MusicServiceImpl.getMusicByTerm(
      query,
      limit,
      offset
    );

    if (!serviceResponse.success) {
      res.status(serviceResponse.errorCode).send(serviceResponse);

      return;
    }

    const musics = serviceResponse as ResponseSuccess<Music[]>;

    res.status(musics.statusCode).send(musics);
  } catch (error) {
    const err = responseUtils.createErrorResponse(
      "An error occurred while fetching music by term",
      500
    );

    res.status(err.errorCode).send(err);
  }
};

export default adminGetMusicTerm;
