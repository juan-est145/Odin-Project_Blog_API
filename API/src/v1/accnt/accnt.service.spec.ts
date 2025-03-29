import { Test, TestingModule } from "@nestjs/testing";
import { AccntService } from "./accnt.service";

describe("AccntService", () => {
	let service: AccntService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [AccntService],
		}).compile();

		service = module.get<AccntService>(AccntService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
