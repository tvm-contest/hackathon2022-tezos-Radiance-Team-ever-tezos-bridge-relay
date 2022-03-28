import { Test, TestingModule } from '@nestjs/testing';
import { EverchainController } from './everchain.controller';

describe('EverChainController', () => {
  let controller: EverchainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EverchainController],
    }).compile();

    controller = module.get<EverchainController>(EverchainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
