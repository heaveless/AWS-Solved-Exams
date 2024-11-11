import { ClassConstructor } from '@heaveless/common';
import { CONTROLLER_METADATA } from '../constants';
import { Injectable } from './injectable';

export function Controller(url: string = '') {
  return (target: ClassConstructor) => {
    Reflect.defineMetadata(CONTROLLER_METADATA, { url }, target);

    Injectable()(target);
  };
}
