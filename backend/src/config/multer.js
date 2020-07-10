import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  dest: resolve(__dirname, '..', '..', 'tmp', 'uploads'), // vai pra ca caso nao funcionar destination
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};

//     filename: (req, file, cb) => {
//       crypto.randomBytes(16, (err, hash) => {
//         // coloca numero aleatorio antes do filename pra nao sobrescrever
//         if (err) cb(err);

//         file.key = `${hash.toString('hex')}-${file.originalname}`; // virou file.key pra ficar igual ao aws

//         cb(null, file.key);
//       });
//     },
//   }), // seleciona onde gravar
//   limits: {
//     fileSize: 2 * 1024 * 1024, // max 2mb
//   },
//   fileFilter: (req, file, cb) => {
//     const allowedMimes = [
//       // tipos formato permitidos
//       'image/jpeg',
//       'image/pjpeg',
//       'image/png',
//     ];
//     if (allowedMimes.includes(file.mimetype)) {
//       // checa se o tipo esta na minha array
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type.'));
//     }
//   },
// };
