enum Transports {
  Train,
  MRT,
  Aviation,
}

// Train
enum TrainStops {
  Pingtung = 'Pingtung',
  Kaohsiung = 'Kaohsiung',
  Tainan = 'Tainan',
  Taichung = 'Taichung',
  Hsinchu = 'Hsinchu',
  Taipei = 'Taipei',
}

type TrainStopDetail = {
  name: TrainStops
  nextStop: TrainStops
  duration: Time
}

// MRT
enum MRTStops {
  Taipei,
  Taoyuan,
  Taichung,
  Tainan,
  Kaohsiung,
}

type MRTStopDetail = {
  name: TrainStops
  nextStop: TrainStops
  duration: Time
}

// Aviation
enum AviationStops {
  Taipei,
  Taoyuan,
  Kaohsiung,
}

type AviationStopDetail = {
  name: TrainStops
  nextStop: TrainStops
  duration: Time
}
