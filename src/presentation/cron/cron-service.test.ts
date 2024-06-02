import { CronService } from './cron-service';



describe('cron-service.test.ts', () => {

  // se espera que se ejecute la tarea
  test('should create a job', (done) => {
    const mokJobTickCb = jest.fn();
    const newCronService = CronService.createJob('*/2 * * * * *', mokJobTickCb);

    const timeOutIntance = setTimeout(()=>{

      expect(mokJobTickCb).toHaveBeenCalledTimes(1);

      newCronService.stop();
      clearTimeout(timeOutIntance);
      done();
    }, 2100)
  });
});