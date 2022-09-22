class TrainTicketSystem extends TicketSystem {
  constructor(
    startingPoint: TrainStops,
    destination: TrainStops,
    departureTime: Date
  ) {
    super(Transports.Train, startingPoint, destination, departureTime)
  }
  private trainStopDetails: Map<TrainStops, TrainStopDetail> = new Map([
    [
      TrainStops.Pingtung,
      {
        name: TrainStops.Pingtung,
        nextStop: TrainStops.Kaohsiung,
        duration: [2, 30, 0],
      },
    ],
    [
      TrainStops.Kaohsiung,
      {
        name: TrainStops.Kaohsiung,
        nextStop: TrainStops.Tainan,
        duration: [1, 45, 30],
      },
    ],
    [
      TrainStops.Tainan,
      {
        name: TrainStops.Tainan,
        nextStop: TrainStops.Taichung,
        duration: [3, 20, 0],
      },
    ],
    [
      TrainStops.Taichung,
      {
        name: TrainStops.Taichung,
        nextStop: TrainStops.Hsinchu,
        duration: [2, 30, 30],
      },
    ],
    [
      TrainStops.Hsinchu,
      {
        name: TrainStops.Hsinchu,
        nextStop: TrainStops.Taipei,
        duration: [1, 30, 30],
      },
    ],
  ])

  private isStopExist(stop: any): stop is TrainStops {
    return Object.keys(TrainStops).includes(stop)
  }

  protected deriveDuration(): Time {
    // exception
    if (!this.isStopExist(this.startingPoint))
      throw new Error('Wrong starting point!')
    if (!this.isStopExist(this.destination))
      throw new Error('Wrong destination!')

    // function
    const calDurationTime = (STA: TrainStops, DES: TrainStops): Time => {
      if (STA === DES) return [0, 0, 0]

      const detail = this.trainStopDetails.get(STA)
      if (!detail) throw new Error('Wrong stop detail!')

      const { nextStop, duration: preDuration } = detail
      const posDuration = calDurationTime(nextStop, DES)

      return [
        preDuration[0] + posDuration[0],
        preDuration[1] + posDuration[1],
        preDuration[2] + posDuration[2],
      ]
    }

    const convertTime = (hrs: number, mins: number, secs: number): Time => {
      const time: Time = [hrs, mins, secs]

      for (let i = time.length - 1; i > 0; i--) {
        const carry = Math.floor(time[i] / 60)
        time[i - 1] += carry
        time[i] -= carry * 60
      }

      return time
    }

    // run
    const rawTime = calDurationTime(this.startingPoint, this.destination)
    const durationTime = convertTime(...rawTime)

    return durationTime
  }
}
