# Taxi Booking System


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


## Data

### Config defaults

```
/config/default.js
```

- time the service has been up
- initial car positions
- number of cars


### Cars

```
- id: integer
- x: integer
- y: integer
- available: boolean
```


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
{
  car_id: id,
  total_time: t
}
```

failed to find a car available
```
{}
```


### POST /api/tick

#### request

empty body


#### controller

- timestamp += 1 Time Unit
- decrease all booked cars' timeRemaining time


### POST /api/reset

#### request

empty body


#### controller

- put all the cars back to their initial position
- make them all available
