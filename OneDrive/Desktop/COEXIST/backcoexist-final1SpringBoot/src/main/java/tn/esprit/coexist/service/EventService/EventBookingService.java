package tn.esprit.coexist.service.EventService;

import com.paypal.orders.OrderRequest;
import tn.esprit.coexist.entity.Event;
import tn.esprit.coexist.entity.EventBooking;

import java.util.List;

public interface EventBookingService {



    public List<EventBooking> getALLBooking();

    public void deleteEventBookingById(Integer bookingEventId);

    public boolean checkAvailability(Event event, int numberOfTickets);
    public double calculateTotalAmount(Event event, int numberOfTickets);
    public double createReservation(Integer userId, Integer eventId, int numberOfTickets,
                                    String cardNumber, String cardHolderName,
                                    String expirationDate, String cvv);
    public OrderRequest buildRequestBody(String cardNumber, String cardHolderName,
                                         String expirationDate, String cvv,
                                         double totalAmount);

    public void sendReservationConfirmationWhatsApp(String recipientPhoneNumber, String eventName, int numberOfTickets, double totalAmount);


}