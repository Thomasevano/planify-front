import { describe, expect, it } from "vitest";
import { formatTime } from "../helpers/utils";

describe("utils", () => {
  describe("formatTime", () => {
    it("should return a time in the format of HH:MM:mm", () => {
      // given
      const timeSlot = "0000-01-01T09:00:00+00:09";
      
      // when
      const result = formatTime(timeSlot);
      
      // then
      expect(result).toBe("9:00");
    });
  });
});