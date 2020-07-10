import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

// aula 17 - 16:30 explicacao

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    // usa o bee pra criar o job usando as config do redis
    // inicializa as filas passa as configuracoes pra cada um dos jobos para as queues.
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle, // passa as acoes do job em si
      };
    });
  }

  // realmente envia trabalhos pra queue
  add(queue, job) {
    // quando chama add passando esses parametros, bota o trabalho dentro da fila
    return this.queues[queue].bee.createJob(job).save();
  }

  // realmente realiza os trabalhos
  processQueue() {
    jobs.forEach(job => {
      // pega esses objetos que passei la no init
      const { bee, handle } = this.queues[job.key];
      // processa o trab
      bee.process(handle);
    });
  }
}

export default new Queue();
