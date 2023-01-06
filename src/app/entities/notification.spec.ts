import { Notification } from './notification';
import { Content } from './content';

describe("Notification", () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      category: 'friendship-request',
      content: new Content('Voce recebeu uma solicitação de amizade.'),
      recipientId: '123',
    });
    expect(notification).toBeTruthy();
  })
});
