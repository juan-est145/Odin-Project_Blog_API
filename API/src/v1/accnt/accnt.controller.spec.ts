import { Test, TestingModule } from "@nestjs/testing";
import { AccntController } from "./accnt.controller";

describe("AccntController", () => {
	let controller: AccntController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AccntController],
		}).compile();

		controller = module.get<AccntController>(AccntController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
