import {TestBed} from '@angular/core/testing';
import createSpy = jasmine.createSpy;
import {BrowserWindowRef, windowFactory, WindowRef} from './window.service';

export class WindowRefExt extends WindowRef { }

describe('Unit test for window.service', () => {
  let service: BrowserWindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrowserWindowRef]
    });
    service = new BrowserWindowRef();
  });

  it('When call function from abstract class Exception will be occur', (done: DoneFn) => {
    const windowRef = new WindowRefExt();
    expect(() => {
      const wd = windowRef.nativeWindow;
    }).toThrowError('Not implemented.');
    done();
  });

  it('Native window will be returned', (done: DoneFn) => {
    expect(service.nativeWindow).toEqual(window);
    done();
  });

  it('Default object will be returned from factory function', (done: DoneFn) => {
    expect(windowFactory(service, 'other')).toEqual({});
    done();
  });

  it('Native window will be returned from factory function', (done: DoneFn) => {
    expect(windowFactory(service, 'browser')).toEqual(window);
    done();
  });
});
