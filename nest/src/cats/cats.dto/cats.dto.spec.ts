import { CatsDto } from "./cats.dto";

describe("CatsDto", () => {
	it("should be defined", () => {
		expect(new CatsDto()).toBeDefined();
	});
});
