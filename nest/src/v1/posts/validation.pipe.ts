import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class PositiveIntVal implements PipeTransform<string, number> {
	transform(value: string): number {
		const val = parseInt(value, 10);
		if (isNaN(val) || val <= 0)
			throw new BadRequestException(
				"The numbers of posts must be positive if included",
			);
		return val;
	}
}
