import { Request, Response } from 'express';
import Driver from '../schemas/Driver';

class DriverController {
  async index(request: Request, response: Response): Promise<Response<any>> {
    const drivers = await Driver.find({});
    return response.json(drivers);
  }

  async show(request: Request, response: Response): Promise<Response<any>> {
    const driver = await Driver.findOne({ cpf: request.params.id });
    if (!driver) {
      return response.status(401).json({ error: 'CPF nao cadastrado' });
    }
    return response.json(driver);
  }

  async store(request: Request, response: Response): Promise<Response<any>> {
    const { name, lastName, cpf, birthday, active = true } = request.body;
    if (await Driver.findOne({ cpf })) {
      return response.status(401).json({ error: 'CPF ja cadastrado' });
    }
    const formattedBirthday = new Date(
      Number(birthday.split('/')[2]),
      Number(birthday.split('/')[1]) - 1,
      Number(birthday.split('/')[0])
    );
    const driver = await Driver.create({
      name,
      lastName,
      cpf,
      birthday: formattedBirthday,
      active,
    });
    return response.json(driver);
  }

  async update(request: Request, response: Response): Promise<Response<any>> {
    const cpf = request.params.id;
    const driver = await Driver.findOne({ cpf });
    const {
      newName,
      newLastName,
      newCpf,
      newBirthday,
      newStatus,
    } = request.body;

    if (!driver) {
      return response.status(401).json({ error: 'CPF nao cadastrado' });
    }
    if (await Driver.findOne({ cpf: newCpf })) {
      return response.status(401).json({ error: 'CPF ja cadastrado' });
    }

    const formattedNewBirthday = newBirthday
      ? new Date(
        Number(newBirthday.split('/')[2]),
        Number(newBirthday.split('/')[1]) - 1,
        Number(newBirthday.split('/')[0])
      )
      : driver.birthday;

    const newDriver = {
      name: newName || driver.name,
      lastName: newLastName || driver.lastName,
      cpf: newCpf || driver.cpf,
      birthday: formattedNewBirthday || driver.birthday,
      active: newStatus || driver.active,
    };

    await driver.update(newDriver);

    return response.json(newDriver);
  }

  async delete(request: Request, response: Response): Promise<Response<any>> {
    const cpf = request.params.id;
    const driver = await Driver.findOne({ cpf });
    if (!driver) {
      return response.status(401).json({ error: 'CPF nao cadastrado' });
    }
    await driver.deleteOne();
    return response.json(driver);
  }
}
export default new DriverController();
