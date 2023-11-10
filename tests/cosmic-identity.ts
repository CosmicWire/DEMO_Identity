import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CosmicIdentity } from "../target/types/cosmic_identity";

describe("poc-cosmic-identity-rust", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.CosmicIdentity as Program<CosmicIdentity>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initializeGlobalState().rpc();
    console.log("Your transaction signature", tx);
  });
});
