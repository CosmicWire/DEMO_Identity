use anchor_lang::prelude::*;

#[derive(Clone, Copy, Default, Debug, PartialEq, AnchorDeserialize, AnchorSerialize)]
pub struct Checkpoint {
    pub month_id: u64,
    pub value: u64,
}

#[account]
#[derive(Default, Debug)]
pub struct PointState {
    pub owner: Pubkey,                    // 32
    pub points_by_month: Vec<Checkpoint>, // 4 + 16 * XX
}

impl PointState {
    pub const INIT_LEN: usize = 8 + 32 + 4;

    pub fn is_owner(&self, address: &Pubkey) -> bool {
        self.owner.eq(address)
    }

    pub fn latest(&self) -> u64 {
        let len = self.points_by_month.len();
        if len == 0 {
            return 0;
        }
        self.points_by_month.last().unwrap().value // should not panic because len > 0
    }

    pub fn append(&mut self, month_id: u64, value: u64) {
        self.points_by_month.push(Checkpoint { month_id, value });
    }

    pub fn try_update(&mut self, month_id: u64, value: u64) -> bool {
        let len = self.points_by_month.len();
        if len == 0 {
            return false;
        } else {
            let latest_point = self.points_by_month.get_mut(len - 1).unwrap(); // should not panic because len > 0
            if latest_point.month_id == month_id {
                latest_point.value = value;
                return true;
            } else {
                return false;
            }
        }
    }

    pub fn clear(&mut self) {
        self.points_by_month.clear();
    }

    pub fn sum(&self) -> u64 {
        let mut sum: u64 = 0;
        for point in self.points_by_month.iter() {
            sum += point.value;
        }
        sum
    }

    pub fn sum_until(&self, month_id: u64) -> u64 {
        let mut sum: u64 = 0;
        for point in self.points_by_month.iter() {
            if point.month_id >= month_id {
                break;
            }
            sum += point.value;
        }
        sum
    }

    pub fn space(len: usize) -> usize {
        Self::INIT_LEN + len * 16
    }
}
