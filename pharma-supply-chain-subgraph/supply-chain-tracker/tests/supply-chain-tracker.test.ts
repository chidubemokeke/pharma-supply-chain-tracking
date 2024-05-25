import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { Burn } from "../generated/schema"
import { Burn as BurnEvent } from "../generated/Supply Chain Tracker/Supply Chain Tracker"
import { handleBurn } from "../src/supply-chain-tracker"
import { createBurnEvent } from "./supply-chain-tracker-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _burner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _value = BigInt.fromI32(234)
    let newBurnEvent = createBurnEvent(_burner, _value)
    handleBurn(newBurnEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Burn created and stored", () => {
    assert.entityCount("Burn", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Burn",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_burner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "Burn",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_value",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
