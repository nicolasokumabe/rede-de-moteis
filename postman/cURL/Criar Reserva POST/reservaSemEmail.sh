curl --location 'https://1fee00c9-3cf5-4aaa-ad0b-7fc826712782.mock.pstmn.io/motel/bookings' \
--header 'o conteudo esta na pasta x api key' \
--header 'Content-Type: application/json' \
--data '{
  "motel_id": 1234,
  "room_id": 5678,
  "customer": {
    "name": "João Silva",
    "email": "",
    "phone": "+55 11 91234-5678"
  },
  "check_in": "2025-02-06T14:00:00",
  "check_out": "2025-02-07T12:00:00",
  "payment": {
    "method": "credit_card",
    "card_number": "4111111111111111",
    "expiration": "12/27",
    "cvv": "123"
  },
  "special_requests": "Quarto com hidromassagem e café da manhã incluso"
}
'