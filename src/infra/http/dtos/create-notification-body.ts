import { IsNotEmpty, IsUUID, Length } from "class-validator";

export class CreateNotificationBody {
  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsUUID()
  recipientId: string;

  @IsNotEmpty()
  category: string;

}
