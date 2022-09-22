class TicketSystem {
  constructor(
    private type: Transports,
    protected startingPoint: TrainStops,
    protected destination: TrainStops,
    private departureTime: Date
  ) {}

  protected deriveDuration(): Time {
    return [1, 0, 0]
  }

  private deriveArrivalTime(): Date {
    const [hrs, mins, secs] = this.deriveDuration()
    const durationTime = (hrs * 60 * 60 + mins * 60 + secs) * 1000
    const arrivalTime = this.departureTime.getTime() + durationTime

    return new Date(arrivalTime)
  }

  public getTicketInfo() {
    const ticketName = Transports[this.type]
    const arrivalTime = this.deriveArrivalTime()

    console.log(`
    Ticket Type: ${ticketName}
    Station: ${this.startingPoint} ~ ${this.destination}
    Departure: ${this.departureTime}
    Arrival: ${arrivalTime}
  `)
  }
}
