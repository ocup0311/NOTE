import { TrainStops } from './@type'
import { TrainTicketSystem } from './@class/TicketSystem'

const trainTaiwan = new TrainTicketSystem(
  TrainStops.Kaohsiung,
  TrainStops.Hsinchu,
  new Date(1213)
)

trainTaiwan.getTicketInfo()
