use plotters::prelude::*;
use std::collections::HashSet;

async fn reset_n(start: u32, numbers: &mut Vec<u32>) {
    println!("______ 3n+1 Bruting {} ______", start);
    numbers.push(start);
}

async fn check_if_longest(array: &[u32], obj: &mut StatsObject, start_nr: u32) {
    if array.len() > obj.longest {
        obj.longest = array.len();
        obj.longest_at = start_nr;
    }
    obj.visited_nodes += array.len();
}

async fn check_if_highest(array: &[u32], obj: &mut StatsObject, start_nr: u32) {
    if let Some(&max_val) = array.iter().max() {
        if max_val > obj.highest {
            println!("{:?}", array);
            obj.highest = max_val;
            obj.highest_in = start_nr;
        } else if max_val == obj.highest {
            obj.highest_in = vec![obj.highest_in, start_nr];
        }
    }
}

async fn start_count(start_from: u32, upper_limit: u32) -> StatsObject {
    let mut n = start_from;
    let start_number = n;
    let mut visited_numbers = Vec::new();
    let mut stats_object = StatsObject::default();

    let root = BitMapBackend::new("collatz_graph.png", (800, 600)).into_drawing_area();
    root.fill(&WHITE).unwrap();
    let mut chart = ChartBuilder::on(&root)
        .margin(10)
        .x_label_area_size(30)
        .y_label_area_size(30)
        .build_cartesian_2d(0..upper_limit, 0..stats_object.highest + 10)
        .unwrap();

    chart
        .configure_mesh()
        .x_labels(10)
        .y_labels(10)
        .disable_mesh()
        .draw()
        .unwrap();

    let mut line_data = Vec::new();

    while start_number < upper_limit {
        if visited_numbers.contains(&n) || n <= 1 {
            reset_n(start_number, &mut visited_numbers).await;
            if !visited_numbers.contains(&1) {
                visited_numbers.push(1);
            }
            n = start_number;
            println!("Hailstone (visited) numbers:\n{:?}", visited_numbers);
            println!("Len of numbers visited: {}", visited_numbers.len());
            println!("________________________");
            println!("______ Start the shit baby {} ______", start_number);
            check_if_longest(&visited_numbers, &mut stats_object, start_number).await;

            if !visited_numbers.is_empty() {
                check_if_highest(&visited_numbers, &mut stats_object, start_number).await;
            }

            start_number += 1;
            visited_numbers.clear();

            line_data.push((start_number, stats_object.highest));
            continue;
        } else {
            if n % 2 == 0 {
                visited_numbers.push(n);
                n /= 2;
                println!("Divided by 2 -> {}", n);
            } else {
                visited_numbers.push(n);
                n = 3 * n + 1;
                println!("3n + 1 -> {}", n);
            }
        }

        line_data.push((start_number, n));
    }
    stats_object.iterations = start_number;

    chart
        .draw_series(LineSeries::new(line_data, &RED))
        .unwrap();

    root.present().unwrap();

    stats_object
}

#[derive(Default)]
struct StatsObject {
    highest: u32,
    highest_in: u32,
    longest: usize,
    longest_at: u32,
    iterations: u32,
    visited_nodes: usize,
}

#[tokio::main]
async fn main() {
    let stats = start_count(1, 50).await;

    println!("Output:");
    println!("highest value: {}", stats.highest);
    println!("highest value ({}) in: #{}", stats.highest, stats.highest_in);
    println!("Total visited: {}", stats.visited_nodes);
    println!("----------------------------------------------");
    println!("Hailstone sequences attemptede: {}", stats.iterations);
}
