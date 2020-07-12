import { Request, Response } from 'express';
import Vehicle from '../schemas/Vehicle';
import Driver from '../schemas/Driver';

class VehicleController {
  async index(request: Request, response: Response): Promise<Response<any>> {
    const vehicles = await Vehicle.find();
    return response.json(vehicles);
  }

  async show(request: Request, response: Response): Promise<Response<any>> {
    const vehicle = await Vehicle.findOne({ licensePlate: request.params.id });
    if (!vehicle) {
      return response.status(401).json({ error: 'Placa nao cadastrada' });
    }
    return response.json(vehicle);
  }

  async store(request: Request, response: Response): Promise<Response<any>> {
    const { ownerCpf, licensePlate, renavam } = request.body;
    const driver = await Driver.findOne({ cpf: ownerCpf });

    if (!driver) {
      return response.status(401).json({ error: 'CPF nao cadastrado' });
    }

    if (await Vehicle.findOne({ licensePlate })) {
      return response.status(401).json({ error: 'Placa ja cadastrado' });
    }
    if (await Vehicle.findOne({ renavam })) {
      return response.status(401).json({ error: 'Renavam ja cadastrado' });
    }

    const vehicle = await Vehicle.create({
      owner: `${driver.name} ${driver.lastName}`,
      licensePlate,
      renavam,
    });

    return response.json(vehicle);
  }

  async update(request: Request, response: Response): Promise<Response<any>> {
    const licensePlate = request.params.id;
    const vehicle = await Vehicle.findOne({ licensePlate });
    const { newOwnerCpf, newPlate, newRenavam } = request.body;
    const driver = newOwnerCpf && (await Driver.findOne({ cpf: newOwnerCpf }));

    if (!vehicle) {
      return response.status(401).json({ error: 'Placa nao cadastrado' });
    }

    if (newOwnerCpf && !driver) {
      return response.status(401).json({ error: 'CPF nao cadastrado' });
    }

    if (await Vehicle.findOne({ licensePlate: newPlate })) {
      return response.status(401).json({ error: 'Placa ja cadastrado' });
    }

    if (await Vehicle.findOne({ renavam: newRenavam })) {
      return response.status(401).json({ error: 'Renavam ja cadastrado' });
    }
    const newOwner = newOwnerCpf && `${driver.name} ${driver.lastName}`;

    const newVehicle = {
      owner: newOwner || vehicle.owner,
      licensePlate: newPlate || vehicle.licensePlate,
      renavam: newRenavam || vehicle.renavam,
    };

    await vehicle.update(newVehicle);

    return response.json(newVehicle);
  }

  async delete(request: Request, response: Response): Promise<Response<any>> {
    const vehicle = await Vehicle.findOne({ licensePlate: request.params.id });
    if (!vehicle) {
      return response.status(401).json({ error: 'Placa nao cadastrado' });
    }
    await vehicle.deleteOne();
    return response.json(vehicle);
  }
}
export default new VehicleController();
