import { Time } from './Time'

export enum Transports {
  Train,
  MRT,
  Aviation,
}

// Train
export enum TrainStops {
  Pingtung = 'Pingtung',
  Kaohsiung = 'Kaohsiung',
  Tainan = 'Tainan',
  Taichung = 'Taichung',
  Hsinchu = 'Hsinchu',
  Taipei = 'Taipei',
}

export type TrainStopDetail = {
  name: TrainStops
  nextStop: TrainStops
  duration: Time
}

// MRT
export enum MRTStops {
  Taipei,
  Taoyuan,
  Taichung,
  Tainan,
  Kaohsiung,
}

export type MRTStopDetail = {
  name: TrainStops
  nextStop: TrainStops
  duration: Time
}

// Aviation
export enum AviationStops {
  Taipei,
  Taoyuan,
  Kaohsiung,
}

export type AviationStopDetail = {
  name: TrainStops
  nextStop: TrainStops
  duration: Time
}
