import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "@utilities/helper-type.util";
import { NotifyService } from "./notify.service";
import { SendMultipleDTO, SendNotifyDTO, SendTopicsDTO, SubscribeTopicDTO } from "@dtos/notify.dto";

@Controller()
export class NotifyController {
  constructor(private readonly service: NotifyService) {}

  @Post("send")
  async sendNotification(@Body() body: SendNotifyDTO, @Res() res: Response) {
    return this.service
      .sendSpecificDevice(body)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("multiple")
  async sendMultipleNotification(@Body() body: SendMultipleDTO, @Res() res: Response) {
    return this.service
      .sendMultipleDevice(body)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("topics")
  async sendNotificationTopics(@Body() body: SendTopicsDTO, @Res() res: Response) {
    return this.service
      .sendToSpecificTopics(body)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK", data: result })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }

  @Post("subscribe")
  async addSubscribe(@Res() res: Response, @Body() body: SubscribeTopicDTO) {
    return this.service
      .clientSubscribeToTopic(body)
      .then((result) =>
        res.asJson(HttpStatus.OK, { message: "OK" })
      )
      .catch((err: any) =>
        res.asJson(HttpStatus.BAD_REQUEST, { message: err.message })
      );
  }
}
