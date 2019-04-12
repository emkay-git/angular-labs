import { ExternalModule } from './external.module';

describe('ExternalModule', () => {
  let externalModule: ExternalModule;

  beforeEach(() => {
    externalModule = new ExternalModule();
  });

  it('should create an instance', () => {
    expect(externalModule).toBeTruthy();
  });
});
