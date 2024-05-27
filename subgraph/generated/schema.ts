// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal,
} from "@graphprotocol/graph-ts";

export class Batch extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Batch entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Batch must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("Batch", id.toString(), this);
    }
  }

  static loadInBlock(id: string): Batch | null {
    return changetype<Batch | null>(store.get_in_block("Batch", id));
  }

  static load(id: string): Batch | null {
    return changetype<Batch | null>(store.get("Batch", id));
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get manufacturer(): string | null {
    let value = this.get("manufacturer");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set manufacturer(value: string | null) {
    if (!value) {
      this.unset("manufacturer");
    } else {
      this.set("manufacturer", Value.fromString(<string>value));
    }
  }

  get manufactureDate(): BigInt | null {
    let value = this.get("manufactureDate");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set manufactureDate(value: BigInt | null) {
    if (!value) {
      this.unset("manufactureDate");
    } else {
      this.set("manufactureDate", Value.fromBigInt(<BigInt>value));
    }
  }

  get expiryDate(): BigInt | null {
    let value = this.get("expiryDate");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set expiryDate(value: BigInt | null) {
    if (!value) {
      this.unset("expiryDate");
    } else {
      this.set("expiryDate", Value.fromBigInt(<BigInt>value));
    }
  }

  get status(): string | null {
    let value = this.get("status");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set status(value: string | null) {
    if (!value) {
      this.unset("status");
    } else {
      this.set("status", Value.fromString(<string>value));
    }
  }
}

export class TemperatureEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save TemperatureEvent entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type TemperatureEvent must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`,
      );
      store.set("TemperatureEvent", id.toString(), this);
    }
  }

  static loadInBlock(id: string): TemperatureEvent | null {
    return changetype<TemperatureEvent | null>(
      store.get_in_block("TemperatureEvent", id),
    );
  }

  static load(id: string): TemperatureEvent | null {
    return changetype<TemperatureEvent | null>(
      store.get("TemperatureEvent", id),
    );
  }

  get id(): string {
    let value = this.get("id");
    if (!value || value.kind == ValueKind.NULL) {
      throw new Error("Cannot return null for a required field.");
    } else {
      return value.toString();
    }
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get batchId(): string | null {
    let value = this.get("batchId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set batchId(value: string | null) {
    if (!value) {
      this.unset("batchId");
    } else {
      this.set("batchId", Value.fromString(<string>value));
    }
  }

  get temperature(): BigInt | null {
    let value = this.get("temperature");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set temperature(value: BigInt | null) {
    if (!value) {
      this.unset("temperature");
    } else {
      this.set("temperature", Value.fromBigInt(<BigInt>value));
    }
  }

  get timestamp(): BigInt | null {
    let value = this.get("timestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set timestamp(value: BigInt | null) {
    if (!value) {
      this.unset("timestamp");
    } else {
      this.set("timestamp", Value.fromBigInt(<BigInt>value));
    }
  }
}
