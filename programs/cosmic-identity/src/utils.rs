use crate::constants::SECONDS_PER_MONTH;
use anchor_lang::prelude::*;
use solana_program::{program::invoke, system_instruction};

pub fn validate_score(score: u64) -> bool {
    score <= 500
}

pub fn preview_fee(value: u64, fee_numerator: u64, fee_denumerator: u64, min_fee: u64) -> u64 {
    let fee = (value as u128 * fee_numerator as u128 / fee_denumerator as u128) as u64;
    if fee > min_fee {
        fee
    } else {
        min_fee
    }
}

pub fn calculate_month_id(time: u64) -> u64 {
    let month_id = time / SECONDS_PER_MONTH;
    month_id
}

pub fn increase_account_size<'a, 'b, 'c, 'info>(
    account_info: &mut AccountInfo<'info>,
    payer: &mut AccountInfo<'info>,
    system_program: &AccountInfo<'info>,
    expand_size: usize,
) -> Result<()> {
    let new_size = account_info.data.borrow().len() + expand_size;
    let rent = Rent::get()?;
    let new_minimum_balance = rent.minimum_balance(new_size);

    let lamports_diff = new_minimum_balance.saturating_sub(account_info.lamports());
    invoke(
        &system_instruction::transfer(payer.key, account_info.key, lamports_diff),
        &[payer.clone(), account_info.clone(), system_program.clone()],
    )?;

    account_info.realloc(new_size, false)?;
    Ok(())
}
