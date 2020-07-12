import { Request, Response } from 'express';

import Vehicle from '../schemas/Vehicle';
import Driver from '../schemas/Driver';

class VehicleOwnerController {
  async store(request: Request, response: Response): Promise<Response<any>> {
    const { licensePlate, ownerCpf } = request.body;
    const vehicle = await Vehicle.findOne({ licensePlate });
    const driver = await Driver.findOne({ cpf: ownerCpf });

    if (!driver) {
      return response.status(401).json({ error: 'CPF nao cadastrado' });
    }
    if (!vehicle) {
      return response.status(401).json({ error: 'Placa nao cadastrado' });
    }
    if (driver.vehicles.includes(vehicle.id)) {
      return response
        .status(401)
        .json({ error: 'Veiculo ja pertense a esse dono' });
    }

    await driver.update({ vehicles: [...driver.vehicles, vehicle.id] });

    return response.json(`Lista de veiculos de ${driver.name} atualizada`);
  }
}
export default new VehicleOwnerController();
