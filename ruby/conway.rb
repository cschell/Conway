require 'matrix'

class Game
  def initialize(width, height, seed_propability)
    @width, @height, @seed_propability = width, height, seed_propability
    @field = initial_field
  end

  def next
    @field = Matrix.build(@width, @height) do |row, column|
      @field[row, column].next_generation(neighbours_of(row, column))
    end
  end

  def to_s
    @field.to_a.map { |row|
      row.map(&:to_s).join(" ")
    }.join("\n")
  end

  def schroedingers_cell
    if rand >= @seed_propability
      DeadCell.new
    else
      LivingCell.new
    end
  end

  private

  def neighbours_of(row, column)
    neighbour_offsets = [-1, 0, +1].repeated_permutation(2)
                                   .reject {|c| c == [0,0]}

    neighbour_offsets.map do |row_offset, column_offset|
      @field[row + row_offset, column + column_offset]
    end.compact
  end

  def initial_field
    Matrix.build(@width, @height) do
      schroedingers_cell
    end    
  end
end

class Cell
  def next_generation(neighbours)
    case neighbours.select(&:living?).count
    when 2
      do_nothing!
    when 3
      live!
    else
      be_dead!
    end
  end

  def living?
    false
  end

  def do_nothing!
    self
  end

  def be_dead!
    DeadCell.new
  end

  def live!
    LivingCell.new
  end
end

class LivingCell < Cell
  def to_s
    'x'
  end

  def living?
    true
  end
end

class DeadCell < Cell
  def to_s
    '_'
  end
end