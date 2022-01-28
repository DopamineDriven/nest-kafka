export class UserShape {
  constructor(public readonly userId: string, public readonly stripeUserId: string) {}

  toString() {
    return JSON.stringify(
      {
        userId: this.userId,
        stripeUserId: this.stripeUserId
      },
      null,
      2
    );
  }
}
