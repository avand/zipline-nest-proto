# Zipline Nest Prototype

This app is a very very crude prototype of an order fufillment application that could be used at a Zipline Nest facility.

Once the app is running, click "Simulate new orders" to create 3 new fake orders. They'll be created with generated IDs and mixed timestamps relative to now. One of them will be "critical" priority.

Main objectives:

1. Demonstrate the ability to listen to database changes to orders with Firestore
2. Implement (probably mostly correct) sorting based on when the order was placed and criticality (oldest, most critical orders first)
3. Demonstrate the ability to build a working (albeit crude) UI in very little time
4. Demonstrate the ability to get an app hosted and running (also in short order)
