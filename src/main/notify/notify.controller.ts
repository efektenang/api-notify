import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "@utilities/helper-type.util";
import { NotifyService } from "./notify.service";
import { SendNotifyDTO } from "@dtos/notify.dto";

@Controller()
export class NotifyController {
  constructor(private readonly service: NotifyService) {}

  @Post("send")
  async sendNotification(
    @Body() body: SendNotifyDTO[],
    @Res() res: Response,
    @Req() req: Request
  ) {
    return this.service
      .sendFirebaseMessages(body)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) => res.asJson(HttpStatus.BAD_REQUEST, { message: err.message }));
    }
}
