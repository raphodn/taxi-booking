# Taxi Booking System

## Goal

A simple implementation of a taxi booking system in a 2D world. Cars start at (0, 0), can be booked by a customer via the /api/book endpoint (the closest car to the customer must be chosen), and remain unavailable for the whole duration of the trip.


## Get started

Prerequisite: you will need Node.js to run this service. Install it here: https://nodejs.org/en/

- Clone the repo
- `cd taxi-booking`
- `npm install`


### Run

```
npm run start
```

Available endpoints ? see below



### Test

```
npm run test
```

Libraries used:
- Jest for unit tests
- Jest & Supertest for integration tests


## Data

### Default config

```
/config/default.js
```

- `timeServiceUp` (integer): time the service has been up
- `initPosition` (array [x, y]): initial car positions
- `cars` (integer): number of cars
- `carData` (array): contains the cars current details/status


### Cars

- `id` (integer)
- `x` (integer): x position on the grid
- `y` (integer): y position on the grid
- `available` (boolean): false if booked
- `timeRemaining` (integer): positive if currently booked, measures the time until the car is available again (decreases on each tick)


## Endpoints

### POST /api/book

#### request

body
```
{
  source: { x: x1, y: y1 },
  destination: { x: x2, y: y2 }
}
```

#### controller

- find the nearest *available* car
  - if equality, return smallest id
- compute the total_time = (distance car-customer) + (distance source-destination)


#### response

success (car available)
```
status: 200
body: {
  car_id: id,
  total_time: t
}
```

failed to find a car available
```
status: 200
body: {}
```


### POST /api/tick

#### request

empty body


#### controller

- timestamp += 1 Time Unit
- decrease all booked cars' timeRemaining time

#### response

```
status: 200
body: {
  timeServiceUp: value
}
```


### POST /api/reset

#### request

empty body


#### controller

- put all the cars back to their initial position
- make them all available


#### response

```
status: 200
```
