export interface CreatePaymentDto {
  orderId: number;
}

export interface PaymentCallbackDto {
  authority: string;
  status: string;
  transactionId?: string;
  refId?: string;
}
